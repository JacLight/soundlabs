import { getAppEngineClient } from '@/lib/appengine/appmint-client';
import { getResponseErrorMessage } from '@/lib/appengine/utils/helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return handleRequest('GET', request, await params);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return handleRequest('POST', request, await params);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return handleRequest('PUT', request, await params);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return handleRequest('DELETE', request, await params);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return handleRequest('PATCH', request, await params);
}

async function handleRequest(method: string, request: NextRequest, params: { slug: string[] }) {
  try {
    // Get the path from the slug parameters
    const clientPath = params.slug.join('/');
    const clientURL = request.url.includes('api/') ? request.url.split('api/')[1] : clientPath;

    // Get query parameters
    const url = new URL(request.url);
    const clientQuery = Object.fromEntries(url.searchParams.entries());

    // Get request body for POST/PUT/PATCH requests
    let clientData = null;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const contentType = request.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          clientData = await request.json();
        } else if (contentType?.includes('multipart/form-data')) {
          clientData = await request.formData();
        } else {
          clientData = await request.text();
        }
      } catch (error) {
        // If body parsing fails, continue without data
        console.warn('Failed to parse request body:', error);
      }
    }

    // Get authorization header, fallback to cookie if not provided
    let clientAuthorization = request.headers.get('authorization');
    
    // If no authorization header, try to get token from cookie
    if (!clientAuthorization) {
      const token = request.cookies.get('token');
      if (token) {
        clientAuthorization = `Bearer ${token.value}`;
      }
    }

    // Get comprehensive client info including geo data
    const clientInfo = {timezone: request.headers.get('x-client-timezone')}; //await getRequestInf(request.headers);
    // await logRequest(clientInfo.host, request);

    // Check if this is a multipart request
    const isMultiPath = request.headers.get('content-type')?.includes('multipart/form-data') || false;

    // Process the request using AppEngineClient
    const appEngineClient = getAppEngineClient();
    console.log('Processing request with AppEngineClient:', clientURL);
    const result = await appEngineClient.processRequest(method, clientURL, clientData, clientAuthorization, clientQuery, clientInfo, isMultiPath);
    // Return the response
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Route Error:', error);

    // Handle different types of errors
    if (error instanceof Error) {
      const axiosError = error as any;
      if (axiosError.response) {
        return NextResponse.json(
          {
            error: getResponseErrorMessage(axiosError),
            status: axiosError.response.status,
          },
          { status: axiosError.response.status },
        );
      }

      // Generic error
      const errorMessage = getResponseErrorMessage(error);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    // Unknown error
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
