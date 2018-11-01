drop table if exists gguser cascade;

drop table if exists ngo cascade;

drop table if exists donor cascade;

drop table if exists searches cascade;

drop table if exists subscriptions cascade;

drop table if exists donation cascade;

drop table if exists recurringdonation cascade;

drop table if exists userips cascade;

drop table if exists paymentinfo cascade;


create table if not exists gguser(
  id text unique primary key,
  email text,
  password text,
  username text,
  location text,
  emailConfirmation text,
  confirmed boolean,
  resetPasswordToken text,
  resetPasswordExp text
);

create table if not exists ngo(
  id text unique primary key references gguser,
  emailTemplate text,
  description text,
  calLink text,
  notice text,
  category int,
  minLimit bigint,
  maxLimit bigint
);

create table if not exists donor(
  id text unique primary key references gguser
);

create table if not exists searches(
  id text unique primary key references gguser,
  term text
);

create table if not exists subscriptions(
  donorId text references donor,
  ngoId text references ngo
);

create table if not exists donation(
  id text unique primary key,
  donorId text references donor,
  ngoId text references ngo,
  amount bigint,
  message text,
  anonymous boolean,
  type smallint,
  honoredUserId text,
  honoredUserName text,
  created timestamp
);

create table if not exists recurringdonation(
  id text unique primary key,
  donationId text references donation,
  updated timestamp,
  frequency integer
);

create table if not exists userips(
    userId text references gguser,
    ip text
);

create table if not exists paymentinfo(
    userId text references gguser,
    address text,
    ccNumber int,
    cvv int,
    expirationDate timestamp,
    ccName text
);
