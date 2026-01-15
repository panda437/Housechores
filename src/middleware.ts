export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/today/:path*",
        "/leaderboard/:path*",
        "/analytics/:path*",
        "/admin/:path*",
    ],
};
