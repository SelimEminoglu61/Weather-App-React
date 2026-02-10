import { useState } from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { Button } from "@base-ui/react/button";

import styles from "../../assets/css/styleLoginPage.module.css";

function RegisterPage() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1>Sign Up Selim's Weather App</h1>
      <Form
        className={styles.Form}
        errors={errors}
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const value = String(formData.get("url"));

          setLoading(true);
          const response = await submitForm(value);
          const serverErrors = {
            url: response.error,
          };

          setErrors(serverErrors);
          setLoading(false);
        }}
      >
        <Field.Root name="url" className={styles.Field}>
          <Field.Label className={styles.Label}>Username</Field.Label>
          <Field.Control
            type="url"
            required
            defaultValue="https://example.com"
            placeholder="https://example.com"
            pattern="https?://.*"
            className={styles.Input}
          />
          <Field.Error className={styles.Error} />
          <Field.Label className={styles.Label}>Password</Field.Label>
          <Field.Control
            type="password"
            required
            placeholder="**********"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            className={styles.Input}
          />
          <Field.Error className={styles.Error} />
          <Field.Label className={styles.Label}>Confirm Password</Field.Label>
          <Field.Control
            type="password"
            required
            placeholder="**********"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            className={styles.Input}
          />
          <Field.Error className={styles.Error} />
        </Field.Root>
        <Button
          type="submit"
          disabled={loading}
          focusableWhenDisabled
          className={styles.Button}
        >
          Login
        </Button>
        <hr />
        <p className={styles.p}>You signed up?</p>
        <Button
          variant="outline"
          disabled={loading}
          focusableWhenDisabled
          className={styles.Button}
          onClick={() => (window.location.href = "/login")}
        >
          Back to Login
        </Button>
      </Form>
    </>
  );
}

async function submitForm(value) {
  // Mimic a server response
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  try {
    const url = new URL(value);

    if (url.hostname.endsWith("example.com")) {
      return { error: "The example domain is not allowed" };
    }
  } catch {
    return { error: "This is not a valid URL" };
  }

  return { success: true };
}

export default RegisterPage;
