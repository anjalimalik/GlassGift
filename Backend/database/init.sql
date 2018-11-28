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
  id text references gguser,
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
  donationId text references donation,
  next timestamp,
  frequency int
);


create table if not exists userips(
    userId text references gguser,
    ip text
);

create table if not exists paymentinfo(
    userId text references gguser,
    stripeCustomerId text
);
