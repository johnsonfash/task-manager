import { Link } from "react-router-dom";

function Page404() {
  return (
    <main className="pt-5 mt-5 text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <h4 className="mb-4">Page not found</h4>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </main>
  );
}

export default Page404;
