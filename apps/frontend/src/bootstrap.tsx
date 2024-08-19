import { createResource } from "solid-js";
import { render } from "solid-js/web";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

function HelloWorld() {
  const [users] = createResource<User[]>(async () => {
     const response = await fetch("http://localhost:4000/api/v1/users");

    return response.json();
  });

  return (
    <div>
      <p>{users.loading ?? "Loading"}</p>

      <ul>
        {users()?.map((user) => (
          <li>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function bootstrap(target: HTMLElement) {
  render(() => <HelloWorld />, target);
}
