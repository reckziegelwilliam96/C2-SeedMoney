\echo 'Delete and recreate seedmoney db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE seedmoney;
CREATE DATABASE seedmoney;
\connect seedmoney

\i seedmoney-schema.sql
\i seedmoney-seed.sql

\echo 'Delete and recreate seedmoney_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE seedmoney_test;
CREATE DATABASE seedmoney_test;
\connect seedmoney_test

\i seedmoney-schema.sql
