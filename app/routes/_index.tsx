// import { unstable_parseMultipartFormData } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

import { Form, useActionData } from "@remix-run/react";

import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const image = form.get("my-file");
  console.log;
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof image !== "string") {
    throw new Error("Form not submitted correctly.");
  }

  const fields = { image };

  const joke = await db.image.create({ data: fields });
  return redirect(`/`);
};
export default function Index() {
  const actionData = useActionData();
  console.log(actionData);

  return (
    <div className="remix__page">
      <main>
        <h2 className="font-bold text-2xl">
          Welcome to Supabase Remix - File Upload
        </h2>
        <Form method="post" encType="multipart/form-data">
          <input type="file" id="my-file" name="my-file" />
          <button type="submit">UPLOAD</button>
        </Form>
      </main>
    </div>
  );
}
