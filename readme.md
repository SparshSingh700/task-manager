WEEK 2 — Days 15–17
Authentication Completion & Checkpoint
DAY 15 — Protected React Routes & LocalStorage

Time: ~3 hrs

GOAL

Make authentication actually persist on the frontend.

BUILD
Save JWT to localStorage after login.
Read token when the React app starts.
Protect the dashboard from unauthenticated users.
Redirect logged-out users away from the dashboard.
Attach the JWT to every task request.
LEARN
localStorage
React state vs localStorage
Protected routes
Authorization header
Bearer <token>
CHECKLIST
 Token saves to LocalStorage.
 Dashboard redirects when logged out.
 All task requests carry token.
 Can explain state vs LocalStorage.
 Committed code.

This is directly from the PDF's Day 15 scope.

DAY 16 — Authentication Checkpoint

Time: ~1 hr

ACTION

No new feature.

Explain without VS Code:

How login works end-to-end.
How JWT works.
Purpose of Express middleware.
React state vs LocalStorage.
CHECKLIST
 Can explain login end-to-end.
 Can explain JWT.
 Can explain middleware.
 Can explain state vs LocalStorage.
 Reviewed Failure Journal.

DAY 17 — Buffer Day
TWO OPTIONS

If solid:
Rest or lightly review.

If weak:
Pick one concept from Days 1–16 that is still unclear and rebuild/explain it.

CHECKLIST
 Honestly assessed weak areas.
 Fixed one weak area OR rested.
 Ready for next feature.

WEEK 3 — Days 18–24
Task Manager Feature Expansion
🚫 NO V2 REBUILD

The original PDF calls Days 18–24 "The Crucible — v2 Rebuild." We are deliberately removing that part.

Instead, those days become useful work on your existing Task Manager.

DAY 18 — Complete Task CRUD: Update & Delete

Time: ~3 hrs

GOAL

Finish the backend task operations that your current app still lacks.

BUILD
Backend

Create:

PUT /api/tasks/:id
DELETE /api/tasks/:id

Both must ensure the task belongs to the logged-in user.

Update

Allow the owner to modify appropriate task fields such as:

title
completed
Delete

Allow the owner to delete their own task.

IMPORTANT

Do not trust a user value coming from the frontend.

The authenticated user comes from:

req.user.userId
CHECKLIST
 PUT route works.
 DELETE route works.
 User can only modify own task.
 User cannot modify another user's task.
 Tested in Thunder Client.
 Committed code.

Note: This is an adaptation of the PDF's CRUD/rebuild scope to your existing project; the PDF does not separately specify a standalone PUT day.

DAY 19 — Task Dashboard

Time: ~3 hrs

GOAL

Build the actual logged-in Task Manager experience.

FRONTEND

Create the dashboard that:

Fetches the logged-in user's tasks.
Displays them.
Allows creating a task.
Allows marking/updating completion.
Allows deleting a task.
FLOW
Login
  ↓
JWT stored
  ↓
Dashboard
  ↓
GET /api/tasks
  ↓
Backend verifies JWT
  ↓
req.user.userId
  ↓
MongoDB
  ↓
Only user's tasks
CHECKLIST
 Dashboard displays tasks.
 Create works.
 Update works.
 Delete works.
 Only logged-in user's tasks appear.
 Committed code.

This uses the PDF's dashboard/fetching direction while keeping it in your current application rather than rebuilding v2. The original Day 21 specifically covers fetching tasks and a creation form.

DAY 20 — Task Ownership & Authorization Test

Time: ~2 hrs

GOAL

Prove that your authentication actually protects user data.

TEST

Use two users:

User A
User B

Verify:

User A → sees A's tasks
User B → sees B's tasks
User A → cannot update B's task
User A → cannot delete B's task
THINK

Why is this important?

Because:

Authentication = Who are you?
Authorization = What are you allowed to do?
CHECKLIST
 Tested with two users.
 GET isolation works.
 UPDATE authorization works.
 DELETE authorization works.
 No user can access another user's tasks.
DAY 21 — React Task State & UI Synchronization

Time: ~2.5–3 hrs

GOAL

Make the UI update immediately after task operations.

BUILD

When:

CREATE
UPDATE
DELETE

happens, update React state appropriately.

Avoid unnecessary full-page refreshes.

Example:

DELETE request succeeds
        ↓
remove task from React state
        ↓
UI updates immediately

This follows the PDF's emphasis on task fetching/creation and the later independent-delete flow.

CHECKLIST
 Create updates UI.
 Update updates UI.
 Delete updates UI.
 No manual refresh required.
 Committed code.
DAY 22 — Independent Feature Day

Time: ~3 hrs

GOAL

Build one feature without copying from previous code/tutorials.

The PDF's original independent feature is Delete Task. Since you'll already implement Delete on Day 18, use this day to rebuild/test the feature independently and prove that you understand the entire flow. The original PDF explicitly uses the flow:

Click Delete
↓
DELETE /tasks/:id
↓
Express
↓
Mongoose delete
↓
Response
↓
Remove from React state

CHECKLIST
 Can explain DELETE flow.
 Can implement it without looking at old code.
 No refresh required.
 Authorization enforced.
 Committed code.
DAY 23 — Code Reading Deep Dive

Time: ~2 hrs

ACTION

Read a real MERN repository.

Look at:

routes
controllers
models
middleware
components
pages
API/service structure

Map its structure on paper.

Find one abstraction you don't currently use.

For example:

controllers separated from routes

Don't automatically copy it.

CHECKLIST
 Read a real MERN repo.
 Mapped structure.
 Found one new abstraction.
 Wrote down what you learned.

This is unchanged from the PDF.

DAY 24 — Task Manager Checkpoint

Time: ~1 hr

ACTION

Instead of comparing v1 vs v2, which we are no longer building:

Review your current Task Manager.

Explain:

React
 ↓
fetch()
 ↓
Express route
 ↓
authMiddleware
 ↓
req.user
 ↓
Task route
 ↓
Mongoose
 ↓
MongoDB
 ↓
Response
 ↓
React state
 ↓
UI
EXPLAIN
Registration
Login
bcrypt
JWT
Middleware
User → Task relationship
GET tasks
POST task
PUT task
DELETE task
Authorization
CHECKLIST
 Can explain complete architecture.
 Can explain authentication.
 Can explain task ownership.
 Can explain CRUD.
 Identified weak areas.

The PDF's Day 24 is a checkpoint comparing the two builds; we're replacing that comparison with a checkpoint of the single build you're actually maintaining.

WEEK 4 — Days 25–32
Muscle Memory + Production Features

The PDF's Week 4 is already about turning your knowledge into muscle memory.

DAY 25 — Express + MongoDB Speed Drill
BUILD

From an empty temporary folder:

Express server
MongoDB connection
Health-check endpoint

Repeat until setup becomes fast.

TARGET

Get the basic setup under 10 minutes.

DAY 26 — Authentication Speed Drill
BUILD

Within 30 minutes:

User schema
Register
bcrypt
Login
JWT

Then note where you lost time.

DAY 27 — Loading & Error States
BUILD

Add:

isLoading

while tasks are being fetched.

Also show an error when the request fails.

Example flow:

Fetching...
   ↓
Loading...
   ↓
Success → tasks

or:

Fetching...
   ↓
Error → show error message

CHECKLIST
 Loading state.
 Error state.
 Tested both.
 Committed.
DAY 28 — Pagination & Task Filtering
GOAL

Handle more tasks than fit comfortably on one screen.

BACKEND

GET should accept:

page
limit
status

Use:

.skip()
.limit()
EXAMPLE
GET /api/tasks?page=2&limit=10

Also support task status filtering as specified by the PDF.

FRONTEND

Research one real project's pagination UI:

1 2 3 4

versus:

Previous | Next

Then choose one.

DAY 29 — Architecture Teardown
ACTION

Draw your actual current Task Manager architecture.

Not v2.

Trace:

Button click
↓
React
↓
fetch()
↓
HTTP request
↓
Express
↓
Middleware
↓
Route
↓
Mongoose
↓
MongoDB
↓
Response
↓
React state
↓
UI
CHECKLIST
 Full architecture drawn.
 One request traced end-to-end.
 Kept diagram for Day 30.

The PDF's original Day 29 asks for the v2 architecture; we're applying the same exercise to your actual project.

DAY 30 — Architecture Checkpoint
EXPLAIN WITHOUT VS CODE

Explain the entire Task Manager architecture out loud as if you're in a technical interview.

You should be able to explain:

React
Express
MongoDB
Mongoose
JWT
bcrypt
Middleware
REST API
User → Task relationship
CRUD
Authorization
CHECKLIST
 Explained architecture without notes.
 Could trace a request.
 Identified remaining gaps.

DAY 31 — Failure Journal Review
ACTION

Read through the bugs/problems you've recorded throughout the month.

Look specifically for:

Day 1 problems
        ↓
Day 10 problems
        ↓
Day 20 problems
        ↓
Day 30 problems

Write:

What kinds of bugs can I solve now that I couldn't solve at the beginning?

DAY 32 — THE EXIT GATE
Final Phase 0 Assessment

Close VS Code.

QUESTION 1

Do I no longer fear an empty file?

QUESTION 2

Can I explain the entire MERN data flow without opening a tutorial?

QUESTION 3

Can I explain this from memory?

User
 ↓
Register
 ↓
bcrypt
 ↓
MongoDB

Login
 ↓
bcrypt.compare()
 ↓
JWT
 ↓
LocalStorage

Task request
 ↓
Bearer token
 ↓
JWT middleware
 ↓
req.user
 ↓
Task authorization
 ↓
MongoDB
 ↓
Response
 ↓
React state
 ↓
UI
PASS CONDITION

If yes → Phase 0 complete.

If not → repeat the relevant Week 4 drills rather than blindly moving forward.

That matches the PDF's actual Exit Gate.

FINAL UPDATED ROADMAP
Day	Updated Task Manager Plan	Status
15	Protected React Routes + LocalStorage	🔜 Next
16	Auth Checkpoint	
17	Buffer / Weak-spot Fix	
18	Backend Update + Delete	
19	Task Dashboard	
20	User Ownership + Authorization Testing	
21	React Task State Synchronization	
22	Independent Task Feature	
23	MERN Code Reading	
24	Task Manager Checkpoint	
25	Express + MongoDB Speed Drill	
26	Auth Speed Drill	
27	Loading + Error States	
28	Pagination + Filtering	
29	Architecture Teardown	
30	Architecture Checkpoint	
31	Failure Journal Review	
32	Exit Gate	
What has been removed completely

❌ task-manager-v2
❌ Rebuilding Express from scratch for the main project
❌ Rebuilding schemas from scratch
❌ Rebuilding authentication
❌ Rebuilding React Router/auth UI
❌ v1 vs v2 comparison
❌ Any days beyond Day 32
❌ Any material from another roadmap/document