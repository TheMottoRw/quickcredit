const apiTest = {
  users: [
    {
      id: 1,
      email: 'cyemezo@quickcredit.com',
      firstNname: 'Aimable ',
      lastName: 'Cyemezo',
      password: 'abc@xyz',
      address: 'Nyagatare',
      status: 'unverified',
      isAdmin: false,
    },
  ],

  loans: [
    {
      id: 1,
      user: 'cyemezo@quickcredit.com',
      createdOn: '21-02-2019',
      status: 'pending',
      repaid: false,
      tenor: 8,
      amount: 1500.0,
      paymentInstallment: 280.0,
      balance: 1100.0,
      Interest: 250.0,
    },
  ],

  repayments: [
    {
      id: 1,
      createdOn: '13-03-2019',
      loanId: 1,
      amount: 210,
      oldBalance: 1100,
      newBalance: 850,
    },
  ],
};

export default apiTest;
