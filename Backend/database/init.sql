create table if not exists GGUser(
  id text unique primary key,
  email text,
  password text,
  name text,
  location text,
  emailConfirmation text,
  confirmed boolean,
  resetPasswordToken text,
  resetPasswordExp text
);

create table if not exists NGO(
  id text unique primary key references GGUser,
  emailTemplate text,
  description text,
  calLink text,
  notice text,
  category int,
  minLimit bigint,
  maxLimit bigint
);

create table if not exists Donor(
  id text unique primary key references GGUser,
  paymentData text,
  age integer,
  gender text
);

create table if not exists Searches(
  id text unique primary key references GGUser,
  term text
);

create table if not exists Subscriptions(
  donorId text references Donor,
  ngoId text references NGO
);

create table if not exists Donation(
  id text unique primary key,
  donorId text references Donor,
  ngoId text references NGO,
  amount bigint,
  message text,
  anon boolean,
  type smallint,
  honorId text,
  honorName text,
  created timestamp
);

create table if not exists RecurringDonation(
  id text unique primary key,
  donationId text references Donation,
  updated timestamp,
  frequency integer
);

create table if not exists UserIps(
    userId text references GGUser,
    ip text
)
