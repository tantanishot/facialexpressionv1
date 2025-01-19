import { SignInButton } from '@clerk/nextjs';

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
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>Welcome to Our App</h1>
      <p style={{ color: '#aaa', marginBottom: '20px' }}>Please sign in to continue.</p>
      <SignInButton>
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
    </div>
  );
}
