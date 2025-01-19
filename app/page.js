"use client";

import { SignInButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Head from 'next/head'; // Import Head for custom styles and meta tags

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Prefetch the target page for smoother navigation
  useEffect(() => {
    router.prefetch('/videoscanlive');
  }, [router]);

  // Redirect user to the videoscanlive page if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/videoscanlive');
    }
  }, [isSignedIn, router]);

  return (
    <>
      {/* Head Section: Add custom fonts and global styles */}
      <Head>
        <title>Welcome to Faceable</title>
        <meta name="description" content="Sign in to Faceable for real-time facial recognition and accessibility." />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Josefin Sans', sans-serif;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </Head>

      {/* Main Sign-In Page */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#fef4d4', // Soft yellow background
          margin: 0,
        }}
      >
        {/* Signed-Out View */}
        <SignedOut>
          {/* Welcome Header */}
          <h1
            style={{
              color: 'black',
              backgroundColor: '#ffa256', // Warm orange background for contrast
              padding: '20px',
              fontSize: '2rem',
              fontWeight: 'bold',
              borderRadius: '10px',
              marginBottom: '40px',
              width: '100%',
              maxWidth: '600px', // Keep the heading responsive
              fontFamily: "'Josefin Sans', sans-serif",
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
          >
            Welcome to Faceable
          </h1>

          {/* Subtext */}
          <p
            style={{
              color: '#777', // Light gray for subtext
              marginBottom: '20px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Sign in to unlock real-time facial recognition.
          </p>

          {/* Sign-In Button */}
          <SignInButton redirectUrl="/videoscanlive">
            <button
              style={{
                backgroundColor: '#ffa256', // Button matches branding colors
                color: 'black',
                border: 'none',
                borderRadius: '30px',
                padding: '15px 30px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for a raised effect
                maxWidth: '300px', // Keep button width responsive
                width: '100%',
                fontFamily: "'Josefin Sans', sans-serif",
              }}
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        {/* Redirect View for Signed-In Users */}
        <SignedIn>
          <p style={{ color: '#555', fontSize: '1.2rem' }}>Redirecting to your dashboard...</p>
        </SignedIn>
      </div>
    </>
  );
}
