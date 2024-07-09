import { render, screen } from "@testing-library/react";
import TasksPage from "@/pages/TasksPage";

describe("Tasks Page", () => {
  // [x] render Tasks heading
  it("renders Tasks heading", () => {
    render(<TasksPage />);

    const heading = screen.getByRole("heading", { name: /tasks/i });

    expect(heading).toBeInTheDocument();
  });

  // [x] render input box for new task with a '+' icon beside it
  it("renders input box for new task with a '+' icon beside it", () => {
    render(<TasksPage />);

    const newTaskInput = screen.getByLabelText(/new todo input/);

    const addTaskButton = screen.getByLabelText(/add todo button/i);

    expect(newTaskInput).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
  });

  // [ ] if incomplete tasks exist, render them. May need to wait til DB is set up and pulling in tasks first
  it.todo("renders incomplete task if they exist");

  // [x] Incomplete Task Properly displays checkbox, title, edit and delete
  it("Incomplete Task Properly displays checkbox, title, edit and delete", () => {
    render(<TasksPage />);

    const checkbox = screen.getAllByLabelText(/checkbox /i);
    const title = screen.getAllByLabelText(/title /i);
    const editButton = screen.getAllByLabelText(/edit button/i);
    const deleteButton = screen.getAllByLabelText(/delete button /i);

    expect(checkbox[0]).toBeInTheDocument();
    expect(title[0]).toBeInTheDocument();
    expect(editButton[0]).toBeInTheDocument();
    expect(deleteButton[0]).toBeInTheDocument();
  });

  // [ ] if no incomplete tasks exist, render an exciting icon
  it.todo("renders an exciting icon of some sort if no incomplete tasks exist");

  // [x] "Show" button displays and no completed tasks are visible on page load
  it('renders "Show" button on page load', () => {
    render(<TasksPage />);

    const showButton = screen.getByLabelText(/show button/i);

    expect(showButton).toBeInTheDocument();
  });
  it.todo("no completed tasks are visible on page load");
});

describe("Add Task Functionality", () => {
  // [ ] on '+' click, new task is added right below the input box (top of list)
  it.todo(
    "on '+' click, new task is added right below the input box (top of list)"
  );
});

describe("Show/Hide Button", () => {
  // [ ] renders 'Show' completed tasks exist AND are hidden
  it.todo("renders 'Show' completed tasks exist AND are hidden");

  // [ ] renders 'Hide' if completed tasks exist AND are visible
  it.todo("renders 'Hide' if completed tasks exist AND are visible");

  // [ ] Show button is disabled if no completed tasks exist
  it.todo("Show button is disabled if no completed tasks exist");

  // [ ] if completed tasks exist, render them
  it.todo(
    "on click, renders completed tasks if they exist AND title of button changes to 'Hide'"
  );
});

describe("Completed Tasks List", () => {
  // [ ] completed tasks have completed styling - to include checked button, grayed out font, and only
  it.todo(
    "completed tasks have completed styling - to include checked button, grayed out font, and only a delete button"
  );

  // [ ] clicking checkbox marks task as incomplete and moves it back to incomplete tasks list
  it.todo(
    "clicking checkbox marks task as incomplete and moves it back to incomplete tasks list"
  );

  // [ ] on click, hides completed tasks if they exist AND title of button changes to 'Show'
  it.todo(
    "on click, hides completed tasks if they exist AND title of button changes to 'Show'"
  );
});

describe("Complete Task Functionality", () => {
  // [ ] clicking checkbox marks task as complete AND moves it to completed list
  it.todo(
    "clicking checkbox marks task as complete AND moves it to completed list"
  );
});

describe("Edit Task Functionality", () => {
  // [ ] on pencil click, edit form is displayed
  it.todo("on pencil click, edit form is displayed");

  // [ ] on save, task title is updated in the list AND modal is removed from view
  it.todo(
    "on save, task title is updated in the list AND modal is removed from view"
  );

  // [ ] on save, confirmation toast is displayed
  it.todo("on save, confirmation toast is displayed");
});

describe("Delete Task Functionality For", () => {
  // [ ] trash can click opens delete confirmation modal
  it.todo("trash can click opens delete confirmation modal");
  // - for completed AND non-completed tasks

  // [ ] on delete, task is removed from the list AND modal is closed
  it.todo("on delete, task is removed from the list AND modal is closed");
  // - for completed AND non-completed tasks

  // [ ] on delete, confirmation toast is displayed
  it.todo("on delete, confirmation toast is displayed");
  // - for completed AND non-completed tasks
});
