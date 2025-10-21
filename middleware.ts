import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/previous",
  "/personal-room",
  "/upcoming",
  "/recordings",
  "/meeting(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Get the current user's auth info
  const { userId, redirectToSignIn } = await auth();

  // If the route is protected and the user is not logged in, redirect to sign-in
  if (isProtectedRoute(req) && !userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Otherwise, continue the request
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
