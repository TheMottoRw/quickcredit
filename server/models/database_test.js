const quickcredit = {
  users: [
    {
      id: 1,
      token: 'aXRl6xJRf',
      email: 'manziroger@quickcredit.com',
      firstName: 'Roger ',
      lastName: 'Manzi',
      password: '$2b$10$xw4YrkSKwQBEkHGY7sj6gOWlso48RzUcwa.0BKqbHVvZXHDSlrr6m',
      address: 'Nyarugenge,Kigali city',
      status: 'unverified',
      isAdmin: false,
      createdOn: '2019-04-23 12:23',
    },
  ],

  loans: [
    {
      id: 1,
      user: 'manziroger@quickcredit.com',
      createdOn: '2019-04-11',
      status: 'pending',
      repaid: false,
      tenor: 6,
      amount: 1200.0,
      paymentInstallment: 210.0,
      balance: 1050.0,
      Interest: 60.0,
    },
  ],

  repayments: [
    {
      id: 1,
      createdOn: '12-02-2019',
      loanId: 1,
      monthlyInstallement: 210,
      interest : 75.0,
      paidAmount: 210,
      balance: 1050
    },
  ],
};

export default quickcredit;
