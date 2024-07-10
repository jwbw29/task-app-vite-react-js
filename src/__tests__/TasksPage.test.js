import { render, screen, waitFor } from "@testing-library/react";
import TasksPage from "@/pages/TasksPage";
import { getTasks } from "@/api/tasks";

jest.mock("@/api/tasks", () => ({
  getTasks: jest.fn(),
}));

// Mock data
const mockMixedTasks = [
  { id: 1, title: "Test Task 1", completed: false },
  { id: 2, title: "Test Task 2", completed: true },
];
const mockAllCompletedTasks = [
  { id: 1, title: "Test Task 1", completed: true },
  { id: 2, title: "Test Task 2", completed: true },
];
const mockNoCompletedTasks = [
  { id: 1, title: "Test Task 1", completed: false },
  { id: 2, title: "Test Task 2", completed: false },
];

describe("Tasks Page", () => {
  beforeEach(() => {
    getTasks.mockResolvedValue(mockMixedTasks);
  });
  // [x] render Tasks heading
  it("renders Tasks heading", () => {
    render(<TasksPage />);

    const heading = screen.getByRole("heading", { name: /tasks/i });

    expect(heading).toBeInTheDocument();
  });

  // [x] render input box for new task with a '+' icon beside it
  it("renders input box for new task with a '+' icon beside it", () => {
    render(<TasksPage />);

    const newTaskInput = screen.getByLabelText(/new task input/);

    const addTaskButton = screen.getByLabelText(/add task button/i);

    expect(newTaskInput).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
  });

  // [x] Incomplete Task Properly displays checkbox, title, edit and delete
  it("Incomplete Task Properly displays checkbox, title, edit and delete", async () => {
    render(<TasksPage />);

    // Wait for tasks to be rendered
    await waitFor(() => expect(getTasks).toHaveBeenCalled());

    const checkbox = screen.getAllByLabelText(/checkbox /i);
    const title = screen.getAllByLabelText(/title /i);
    const editButton = screen.getAllByLabelText(/edit button/i);
    const deleteButton = screen.getAllByLabelText(/delete button /i);

    expect(checkbox[0]).toBeInTheDocument();
    expect(title[0]).toBeInTheDocument();
    expect(editButton[0]).toBeInTheDocument();
    expect(deleteButton[0]).toBeInTheDocument();
  });

  // [x] "Show" button displays and no completed tasks are visible on page load
  it('renders "Show" button on page load', () => {
    render(<TasksPage />);

    const showButton = screen.getByLabelText(/show button/i);

    expect(showButton).toBeInTheDocument();
  });
});
