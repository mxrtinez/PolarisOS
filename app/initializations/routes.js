const Router = require('koa-router');
const Send = require('koa-send');
const Config = require('../config');
const RouterUtils = require('../modules/utils/router');

function initialize_routes() {
    const router = new Router();

    router.get('/', async (ctx) => {
        await ctx.render('front/views/front');
    });

    router.get('/admin', async (ctx) => {
        await ctx.render('back/views/back');
    });

    router.get('/public/*', async (ctx) => {
        await Send(ctx, ctx.path, { root: Config.root });
    });

    const entities = ['citation'];

    entities.forEach((e) => {
        RouterUtils.generate_entity_routes(router, e, []);
    });
    return router;
}

module.exports = initialize_routes;
