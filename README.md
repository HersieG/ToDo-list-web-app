# ListThat

A full-stack collaborative task management application. Manage your personal tasks and coordinate with your team — with real-time completion tracking, role-based access, and team invitations.

---

## Features

**Personal Tasks**
- Create, edit, and delete tasks
- Set priority levels (High, Medium, Low) and due dates
- Mark tasks as complete or in progress

**Team Tasks**
- Create and manage teams with role-based permissions (Owner, Admin, Member)
- Assign tasks to teams
- See which teammate completed a task
- Task completion history log

**Teams & Invitations**
- Invite users to teams via email invitation
- Accept or decline invitations through in-app notifications
- View all teams you own and teams you're a member of

**Notifications**
- In-app notifications for team invitations and activity

---

## Tech Stack

**Frontend**
- React
- React Router v6
- Tailwind CSS + DaisyUI

**Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL

---

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── api/          # API request functions
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # Auth context
│   │   ├── hooks/        # Custom React hooks
│   │   └── pages/        # Page components
│
├── server/
│   ├── config/           # Database client
│   ├── controllers/      # Route handlers
│   ├── middleware/        # Auth middleware
│   ├── routes/           # Express routes
│   └── prisma/
│       └── schema.prisma
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/listthat.git
   cd listthat
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server/` directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/listthat
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Run database migrations**
   ```bash
   cd server
   npx prisma migrate dev
   ```

5. **Start the development servers**
   ```bash
   # Start the backend (from /server)
   npm run dev

   # Start the frontend (from /client)
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

---

## Database Schema

| Model | Description |
|---|---|
| `User` | Authenticated users |
| `Task` | Personal and team tasks with priority, due date, and completion tracking |
| `Team` | Teams with name, description, and a creator |
| `TeamMember` | Join table linking users to teams with roles |
| `Invitation` | Team invitations with pending/accepted/declined status |
| `Notification` | In-app notifications tied to invitations |
| `TaskCompletionLog` | Audit log of task completions and uncompletion events |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a token |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | `/task` | Get all personal tasks |
| GET | `/task/team/:id` | Get all tasks for a team |
| POST | `/task/createTask` | Create a new task |
| PUT | `/task/:id` | Update a task |
| PATCH | `/task/:id/completed` | Toggle task completion |
| DELETE | `/task/:id` | Delete a task |

### Teams
| Method | Endpoint | Description |
|---|---|---|
| GET | `/team` | Get all teams for current user |
| GET | `/team/:id` | Get a single team |
| POST | `/team` | Create a team |
| DELETE | `/team/:id` | Delete a team |

### Invitations
| Method | Endpoint | Description |
|---|---|---|
| POST | `/invitation` | Send a team invitation |
| PATCH | `/invitation/:id/accept` | Accept an invitation |
| PATCH | `/invitation/:id/decline` | Decline an invitation |

---

## Roles & Permissions

| Action | Member | Admin | Owner |
|---|:---:|:---:|:---:|
| View team tasks | ✅ | ✅ | ✅ |
| Create tasks | ✅ | ✅ | ✅ |
| Complete tasks | ✅ | ✅ | ✅ |
| Invite members | ❌ | ✅ | ✅ |
| Remove members | ❌ | ✅ | ✅ |
| Delete team | ❌ | ❌ | ✅ |

---

## License

MIT
