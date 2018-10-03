create table if not exists GGUser(
  id varchar(30) unique primary key,
  email varchar(30),
  password varchar(30),
  location varchar(30),
  emailConfirmation varchar(30),
  confirmed boolean,
  resetPasswordToken varchar(30),
  resetPasswordExp varchar(30)
);

create table if not exists NGO(
  id varchar(30) unique primary key references GGUser,
  emailTemplate text,
  description varchar(100),
  calLink varchar(30),
  notice varchar(50),
  minLimit bigint,
  maxLimit bigint
);

create table if not exists NGOCategories(
  ngoId varchar(30) unique primary key references NGO,
  category smallint
);

create table if not exists Donor(
  id varchar(30) unique primary key references GGUser,
  paymentData text,
  age integer,
  gender varchar(10)
);

create table if not exists Searches(
  id varchar(30) unique primary key references GGUser,
  term varchar(30)
);

create table if not exists Subscriptions(
  donorId varchar(30) references Donor,
  ngoId varchar(30) references NGO
);

create table if not exists Donation(
  id varchar(30) unique primary key,
  donorId varchar(30) references Donor,
  ngoId varchar(30) references NGO,
  amount bigint,
  message varchar(100),
  anon boolean,
  type smallint,
  honorId varchar(30),
  honorName varchar(100),
  created timestamp
);

create table if not exists RecurringDonation(
  id varchar(30) unique primary key,
  donationId varchar(30) references Donation,
  updated timestamp,
  frequency integer
);
