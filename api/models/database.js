const quickcredit = {
    users: [
        {
            id: 1,
            token: '45erkjherht45495783',
            email: 'manziroger@quickcredit.com',
            firstNname: 'Roger ',
            lastName: 'Manzi',
            password: 'abc@123',
            address: 'Nyarugenge,Kigali city',
            status: 'unverified',
            isAdmin: false,
        }
    ],

    loans: [
        {
            id: 1,
            user: 'manziroger@quickcredit.com',
            createdOn: "12-01-2019",
            status: 'pending',
            repaid: false,
            tenor: 6,
            amount: 1200.0,
            paymentInstallment: 210.0,
            balance: 800.0,
            Interest: 210.0,
        }
    ],

    repayments: [
        {
            id: 1,
            createdOn: '12-02-2019',
            loanId: 1,
            amount: 210,
            oldBalance: 1200,
            newBalance: 990
        }
    ]
}

module.exports=quickcredit;