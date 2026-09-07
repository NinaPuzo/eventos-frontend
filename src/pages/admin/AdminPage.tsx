import type { Role } from "@shared/types/Role";
import type { User } from "@shared/types/User";
import { useEffect, useState } from "react";
import { getRoles } from "../../api/roleService";
import type { TableColumn } from "react-data-table-component";
import DataTable from "react-data-table-component";
import { getAllUsers, updateUserRole } from "../../api/userService";

function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const filteredUsers = selectedRoleId
    ? users.filter((user) => user.roleId === selectedRoleId)
    : users;

  async function handleRoleChange(userId: string, roleId: string) {
    try {
      await updateUserRole(userId, roleId);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, roleId } : user,
        ),
      );
    } catch (error) {
      console.error("Greška pri promeni role korisnika.", error);
    }
  }

  const columns: TableColumn<User>[] = [
    {
      name: "Ime",
      selector: (user) => user.firstName,
    },
    {
      name: "Prezime",
      selector: (user) => user.lastName,
    },
    {
      name: "Email",
      selector: (user) => user.email,
    },
    {
      name: "Rola",
      cell: (user) => (
        <select
          value={user.roleId}
          onChange={(event) => handleRoleChange(user.id, event.target.value)}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.roleName}
            </option>
          ))}
        </select>
      ),
    },
  ];

  useEffect(() => {
    async function loadRoles() {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error("Greška pri učitavanju rola.", error);
      }
    }
    loadRoles();
  }, []);

  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Greška pri učitavanju korisnika.", error);
      }
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h1>Pregled korisnika</h1>

      <select
        value={selectedRoleId}
        onChange={(event) => setSelectedRoleId(event.target.value)}
      >
        <option value="">Sve role</option>

        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.roleName}
          </option>
        ))}
      </select>

      <DataTable columns={columns} data={filteredUsers} />
    </div>
  );
}

export default AdminPage;
