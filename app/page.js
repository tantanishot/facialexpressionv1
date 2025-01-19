"use client";

import { SignInButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Head from 'next/head'; // <-- Import Head here

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
    <>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Josefin Sans', sans-serif;
          }
        `}</style>
      </Head> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#fef4d4' // Background color from original HTML
        }}
      >
        <SignedOut>
          <h1
            style={{
              color: 'black',
              backgroundColor: '#ffa256',
              padding: '20px',
              fontSize: '2rem',
              fontWeight: 'bold',
              borderRadius: '10px',
              marginBottom: '40px', // Space between the heading and sign-in button
              width: '100%',
              maxWidth: '600px', // Limit the width of the heading
              fontFamily: "'Josefin Sans', sans-serif", // Ensure the correct font is applied
            }}
          >
            Welcome to Faceable
          </h1>
          <p
            style={{
              color: '#aaa',
              marginBottom: '20px',
              fontSize: '2rem', // Increase font size for the text
              fontWeight: 'bold', // Make it bold if needed
            }}
          >
            Please sign in to continue.
          </p>
          <SignInButton redirectUrl="/videoscanlive">
            <button
              style={{
                backgroundColor: '#ffa256',
                color: 'black',
                border: 'none',
                borderRadius: '30px',
                padding: '15px 30px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)',
                width: '100%',
                fontFamily: "'Josefin Sans', sans-serif", // Ensure the correct font is applied here too
                maxWidth: '300px', // Limit the button width
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
    </>
  );
}



