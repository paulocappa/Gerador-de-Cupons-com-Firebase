const {
  parseISO,
  isValid,
  isExists,
  isBefore,
  startOfDay,
  endOfDay,
} = require('date-fns');

const database = require('../../database');
const adjustText = require('../../lib/adjustText');

class CouponController {
  create(req, res) {
    const {
      mall,
      store,
      couponName,
      startDate,
      endDate,
      typeCoupon,
      input1Value,
      input2Value,
    } = req.body;

    database
      .ref(adjustText(mall))
      .child(`/${adjustText(store)}/${couponName}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          return res.status(200).json({ error: 'Coupon alredy exists' });
        }

        const sDate = {
          day: Number(startDate.split('-')[2]),
          month: Number(startDate.split('-')[1] - 1),
          year: Number(startDate.split('-')[0]),
        };

        const eDate = {
          day: Number(endDate.split('-')[2]),
          month: Number(endDate.split('-')[1] - 1),
          year: Number(endDate.split('-')[0]),
        };

        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);

        // Validates if startDate is a valid date
        if (!isValid(parsedStartDate) && !isValid(parsedEndDate))
          return res.status(200).json({ error: 'Invalid date' });

        // Validates if the date exists
        if (
          !isExists(sDate.year, sDate.month, sDate.day) ||
          !isExists(eDate.year, eDate.month, eDate.day)
        ) {
          return res.status(200).json({ error: 'Invalid date' });
        }

        if (
          isBefore(startOfDay(parsedStartDate), startOfDay(new Date())) ||
          isBefore(endOfDay(parsedEndDate), endOfDay(new Date())) ||
          isBefore(parsedEndDate, parsedStartDate)
        )
          // Validates that parsedStartDate comes before the current date
          return res.status(200).json({ error: 'Invalid Date' });

        const toSave = {};

        toSave['Tipo do Cupom'] = typeCoupon.type;
        toSave[typeCoupon.input1] = input1Value;
        toSave[typeCoupon.input2] = input2Value;
        toSave['Data de Início'] = startDate;
        toSave['Data de Término'] = endDate;
        toSave.status = 'Ativa';

        database
          .ref(adjustText(mall))
          .child(`/${adjustText(store)}/${couponName}`)
          .set(toSave);

        return res.status(200).json({ success: 'Coupon created' });
      });
  }

  read(req, res) {
    const { mall, store, status } = req.headers;

    database
      .ref(adjustText(mall))
      .child(adjustText(store))
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const data = [];
          snapshot.forEach(snap => {
            if (snap.val().status === status) {
              data.push({
                key: snap.key,
                couponDetails: snap,
                moreDetails: { mall, store },
              });
            }
          });

          return res.status(200).json(data);
        }
        return res.status(200).json([]);
      });
  }

  update(req, res) {
    const { mall, store, coupon } = req.headers;
    const { newCouponName, newStatus, newStartDate, newEndDate } = req.body;

    const refDatabase = database
      .ref(adjustText(mall))
      .child(`/${adjustText(store)}/${coupon}`);

    refDatabase.once('value').then(snapshot => {
      if (snapshot.val()) {
        let sDate = {};
        let eDate = {};

        if (newStartDate) {
          sDate = {
            day: Number(newStartDate.split('-')[2]),
            month: Number(newStartDate.split('-')[1] - 1),
            year: Number(newStartDate.split('-')[0]),
          };

          eDate = {
            day: Number(newEndDate.split('-')[2]),
            month: Number(newEndDate.split('-')[1] - 1),
            year: Number(newEndDate.split('-')[0]),
          };

          const parsedStartDate = parseISO(newStartDate);
          const parsedEndDate = parseISO(newEndDate);

          // Validates if startDate is a valid date
          if (!isValid(parsedStartDate) && !isValid(parsedEndDate))
            return res.status(200).json({ error: 'Invalid date' });

          // Validates if the date exists
          if (
            !isExists(sDate.year, sDate.month, sDate.day) ||
            !isExists(eDate.year, eDate.month, eDate.day)
          ) {
            return res.status(200).json({ error: 'Invalid date' });
          }

          if (
            isBefore(startOfDay(parsedStartDate), startOfDay(new Date())) ||
            isBefore(endOfDay(parsedEndDate), endOfDay(new Date())) ||
            isBefore(parsedEndDate, parsedStartDate)
          )
            // Validates that parsedStartDate comes before the current date
            return res.status(200).json({ error: 'Invalid Date' });
        }

        const updates = {};

        if (newCouponName) {
          updates.couponName = newCouponName;
        }

        if (newStatus) {
          updates.status = newStatus;
        }

        if (newStartDate) {
          updates.startDate = newStartDate;
          updates.endDate = newEndDate;
        }

        refDatabase.update(updates);

        return res.json({ success: 'Updated' });
      }
      return res.status(200).json({ error: 'Coupon does not exists' });
    });
  }

  delete(req, res) {
    const { mall, store, coupon } = req.headers;

    const refDatabase = database
      .ref(adjustText(mall))
      .child(`/${adjustText(store)}/${coupon}`);

    refDatabase.once('value').then(snapshot => {
      if (snapshot.val()) {
        refDatabase.remove(err => {
          if (err)
            return res
              .status(200)
              .json({ error: 'Some error occurred when deleting the coupon' });
        });
        return res.status(200).send({ success: 'Coupon deleted' });
      }
      return res.status(200).json({ error: 'Coupon does not exists' });
    });
  }
}

module.exports = new CouponController();
