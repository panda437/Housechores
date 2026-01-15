import middleware from "next-auth/middleware";
export default middleware;
export { middleware as proxy };

export const config = {
    matcher: [
        "/today/:path*",
        "/leaderboard/:path*",
        "/analytics/:path*",
        "/admin/:path*",
    ],
};
