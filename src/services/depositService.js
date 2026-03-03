const AppError = require("../utils/AppError")
const prisma = require('../config/connectDB')
const redis = require('../config/redis')

const depositService = async ({userId, amount}) => {
    try {
        if (amount <= 0) throw new AppError('Invalid Amount', 400)

        let balance

        await prisma.$transaction(async (tx) => {

            const account = await tx.bank_accounts.findUnique({
                where: { user_id: userId }
            })

            if (!account) throw new AppError('Account Not Found', 404)
                
            const result = await tx.bank_accounts.update({
                where: { id: account.id },
                data: {
                    balance: { increment: amount }
                }
            })

            await tx.transactions.create({
                data: {
                    to_account_id: account.id,
                    amount: amount,
                    type: 'DEPOSIT',
                    status: 'SUCCESS'
                }
            })

            balance = result.balance
        })
        await redis.del(`balance:${userId}`)
        await redis.del(`history-transaction:${userId}`)
        return balance
    }
    catch(err) {
        if(err instanceof AppError) throw err
        throw new AppError('Can Not Deposit', 500)
    }
}
module.exports = depositService