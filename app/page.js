"use client";

import { SignInButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // Prefetch the target page for faster navigation
    router.prefetch('/videoscanlive');
  }, [router]);

  useEffect(() => {
    // Redirect to the desired page if the user is already signed in
    if (isSignedIn) {
      router.push('/videoscanlive');
    }
  }, [isSignedIn, router]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#000', // Optional: Black background for styling
      }}
    >
      <SignedOut>
        <h1 style={{ color: '#fff', marginBottom: '20px' }}>Welcome to Our App</h1>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>Please sign in to continue.</p>
        <SignInButton redirectUrl="/videoscanlive">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <p style={{ color: '#fff' }}>Redirecting...</p>
      </SignedIn>
    </div>
  );
}