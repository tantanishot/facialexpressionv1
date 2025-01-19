import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
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
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>Welcome to Faceable</h1>
      <p style={{ color: '#aaa', marginBottom: '20px' }}>Please sign in to continue.</p>
      <SignIn
        routing="path"
        path="/sign-in"
        appearance={{
          elements: {
            footer: null, // Removes the "Secured by Clerk" footer
          },
        }}
      />
    </div>
  );
}
