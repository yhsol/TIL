# Why you shouldn't put refs in a dependency array

```tsx
import * as React from "react";

function UsernameForm({
  initialUsername = "",
  onSubmitUsername,
}: {
  initialUsername?: string;
  onSubmitUsername: (username: string) => void;
}) {
  const [username, setUsername] = React.useState(initialUsername);
  const [touched, setTouched] = React.useState(false);

  const usernameInputRef = React.useRef<HTMLInputElement>(null);

  const usernameIsLowerCase = username === username.toLowerCase();
  const usernameIsLongEnough = username.length >= 3;
  const usernameIsShortEnough = username.length <= 10;
  const formIsValid =
    usernameIsShortEnough && usernameIsLongEnough && usernameIsLowerCase;
  const displayErrorMessage = touched && !formIsValid;

  React.useEffect(() => {
    if (displayErrorMessage) usernameInputRef.current?.focus();
  }, [displayErrorMessage]);

  let errorMessage = null;
  if (!usernameIsLowerCase) {
    errorMessage = "Username must be lower case";
  } else if (!usernameIsLongEnough) {
    errorMessage = "Username must be at least 3 characters long";
  } else if (!usernameIsShortEnough) {
    errorMessage = "Username must be no longer than 10 characters";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!formIsValid) return;

    onSubmitUsername(username);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
  }

  function handleBlur() {
    setTouched(true);
  }

  return (
    <form name="usernameForm" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          ref={usernameInputRef}
          id="usernameInput"
          type="text"
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
          pattern="[a-z]{3,10}"
          required
          aria-decribedby={displayErrorMessage ? "error-message" : undefined}
        />
      </div>
      {displayErrorMessage ? (
        <div role="alert" className="error-message">
          {errorMessage}
        </div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
}
```
