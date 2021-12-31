-- Seed data with a fake user for testing
BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES('a', 'a@a.com', 7, '2018-01-01');
INSERT INTO login (hash, email) VALUES('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@a.com');

COMMIT;