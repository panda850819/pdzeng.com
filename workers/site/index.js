// Workers Static Assets html_handling redirects extensionless paths to their trailing-slash form with a 307
export default {
  async fetch(request, env) {
    const res = await env.ASSETS.fetch(request);
    if (res.status !== 307) return res;
    return new Response(res.body, { status: 308, headers: res.headers });
  },
};
