
const order = require('../models/order_model')

module.exports = {

    create: (req, res) => {
        console.log(req.body);
        order.create(req.body, (err, ord) => {

            if (err) {
                res.status(500).json('error addig order')

            } else {
                res.status(200).json(
                    {
                        message: 'success adding order',
                        data: ord
                    }
                )

            }
        })

    },

    updateStatus: (req, res) => {
        order.findByIdAndUpdate({ _id: req.params.id }, { status: req.body.status }, { new: true }, (err, ord) => {
            if (err) {
                res.status(500).json(`can't find order `)
            } else {
                res.status(200).json({
                    message: 'status updated',
                    data: ord
                })

            }
        })


    },


    getOrders: (req, res) => {

        const { role } = req.user


        order.find(role === 'admin' ? {} : { User: req.user.id }, (err, orders) => {
            if (err) {
                res.status(500).json('error')
            } else {
                res.status(200).json({
                    message: 'roders',
                    data: orders
                })
            }
        })

    }


}