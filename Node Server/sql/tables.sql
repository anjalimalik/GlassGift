create table User(
  id: varchar(30),
  email: varchar(30),
  password: varchar(30),
  location: varchar(30),
  resetPasswordToken: varchar(30),
  resetPasswordExp: varchar(30),
  primary key(id)
);

create table NGO(
  id: varchar(30),
  emailTemplate: text,
  description: varchar(100),
  calLink: varchar(30),
  notice: varchar(50),
  minLimit: bigint,
  maxLimit: bigint,
  foreign key(id) references User(id)
);

create table NGOCategories(
  ngoId: varchar(30),
  category: smallint,
  foreign key(ngoId) references NGO(id)
);

create table Donor(
  id: varchar(30),
  paymentData: text,
  age: integer(3),
  gender: varchar(10),
  foreign key(id) references User(id)
);

create table Searches(
  id: varchar(30),
  term: varchar(30),
  foreign key(id) references User(id)
);

create table Subscriptions(
  donorId: varchar(30),
  ngoId: varchar(30),
  foreign key(donorId) references User(id),
  foreign key(ngoId) references User(id)
);

create table Donation(
  id: varchar(30),
  donorId: varchar(30),
  ngoId: varchar(30),
  amount: bigint,
  message: varchar(100),
  anon: boolean,
  type: smallint,
  honorId: varchar(30),
  honorName: varchar(100),
  created: timestamp,
);

create table RecurringDonation(
  id: varchar(30),
  donationId: varchar(30),
  updated: timestamp,
  frequency: integer,
  foreign key(donationId) references Donation(id)
);
