--UP
DROP TABLE IF EXISTS members;

CREATE TABLE IF NOT EXISTS members (
    id TEXT,
    created_at TEXT,
    name TEXT,
    organization_id TEXT,
    title TEXT,
    phone_number TEXT
);

REPLACE INTO members VALUES
    ("1", "2020-08-11T16:36:27.612Z","Destin Fahey","organization_id 1","Officer","(840) 116-5157 x17522"),
    ("2", "2020-03-09T03:38:36.139Z","Miss Laverne Effertz","organization_id 2","Executive","941-079-5733 x931"),
    ("3", "2020-07-28T12:46:25.612Z","Herminia Pfeffer","organization_id 3","Technician","512.362.0270 x8191"),
    ("4", "2020-07-18T13:00:13.518Z","Lera Bartoletti","organization_id 4","Planner","(233) 488-0579 x999"),
    ("5", "2020-05-28T15:25:57.736Z","Russel Mohr","organization_id 5","Planner","(440) 282-5649 x9111"),
    ("6", "2020-06-20T14:29:49.692Z","Fredrick Zieme","organization_id 6","Engineer","404-199-7391 x9497"),
    ("7", "2020-10-26T18:06:46.693Z","Summer Cassin","organization_id 7","Executive","(881) 653-1645"),
    ("8", "2020-05-10T05:47:17.483Z","Jillian McCullough II","organization_id 8","Facilitator","583.607.0686"),
    ("9", "2020-01-09T15:56:20.167Z","Mr. Oral Glover","organization_id 9","Coordinator","(875) 691-7187 x652"),
    ("10", "2020-05-23T13:53:34.027Z","Guillermo Jerde","organization_id 10","Director","(095) 450-5157");