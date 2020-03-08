const { Router } = require('express');

const routes = new Router();

const CouponController = require('./app/controllers/CouponController');

routes.get('/getMalls', (req, res) => {
  const malls = [
    {
      mall: 'Shopping 1',
      store: [
        'Shopping 1 - Loja 1',
        'Shopping 1 - Loja 2',
        'Shopping 1 - Loja 3',
      ],
    },
    {
      mall: 'Shopping 2',
      store: [
        'Shopping 2 - Loja 1',
        'Shopping 2 - Loja 2',
        'Shopping 2 - Loja 3',
        'Shopping 2 - Loja 4',
      ],
    },
    {
      mall: 'Shopping 3',
      store: ['Shopping 3 - Loja 1', 'Shopping 3 - Loja 2'],
    },
  ];

  return res.status(200).json(malls);
});

routes.get('/getTypesCoupons', (req, res) => {
  const typesCoupons = [
    {
      type: 'Desconto em %',
      input1: 'Preço Original',
      input2: '(%) de Desconto',
    },
    {
      type: 'Desconto em R$',
      input1: 'Preço com Desconto',
      input2: '(%) de Desconto',
    },
    {
      type: 'Pague X Leve Y',
      input1: 'Pague X',
      input2: 'Leve Y',
    },
    {
      type: 'Compre e Ganhe',
      input1: 'Compre X',
      input2: 'Ganhe Y',
    },
  ];

  return res.status(200).json(typesCoupons);
});

routes.get('/showCoupons', CouponController.read);
routes.post('/createCoupon', CouponController.create);
routes.put('/updateCoupon', CouponController.update);
routes.delete('/deleteCoupon', CouponController.delete);

module.exports = routes;
