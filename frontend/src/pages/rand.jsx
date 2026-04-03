{isLoggedIn ? (
    <LogOutButton />
  ) : (
    <div className="flex gap-4">
      <LoginButton />
      <RegisterButton />
    </div>
  )}