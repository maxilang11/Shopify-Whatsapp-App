require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const cors = require('@koa/cors');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const configHandler = require('./server/configHandler');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.use(bodyParser({
    multipart: true,
    urlencoded: true
 }));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_script_tags', 'write_script_tags'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        
        await configHandler.createConfig(shop).catch((err) => {
          console.error(err);
        });

        // Include JS Script

        ctx.redirect('/');
      },
    }),
  );

  router.get('/public-config', cors({
    origin: '*',
  }), async (ctx) => {
    if (typeof ctx.request.query.shop !== 'undefined') {
      await configHandler.get(ctx.request.query.shop).then(({config}) => {
        if (config == null) {
          ctx.body = { success: false }
        } else {
          ctx.body = { 
            config,
            success: true,
          };

        }
      }).catch((err) => {
        console.error(err);
        ctx.body = { success: false }
      })
    } else {
      ctx.body = { success: false };
    }
  });

  router.get('/config', verifyRequest(), async (ctx) => {
    console.log(ctx.session);
    await configHandler.get(ctx.session.shop).then(({config}) => {
      ctx.body = { 
        config,
        success: true,
      };
    }).catch((err) => {
      console.error(err);
      ctx.body = { success: false }
    })
  });

  router.put('/config', verifyRequest(), async (ctx) => {
    if (typeof ctx.request.body !== "undefined" && typeof ctx.request.body.config !== "undefined") {
      console.log(ctx.request.body.config);
      await configHandler.updateConfig(ctx.session.shop, ctx.request.body.config).then(({config}) => {
        ctx.body = { 
          success: true,
          config,
        }
      }).catch((err) => {
        console.error(err);
        ctx.body = { success: false }
      });
    } else {
      ctx.body = { success: false }
    }
  });

  router.get('(.*)', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
