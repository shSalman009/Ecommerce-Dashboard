import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import AddCategoryForm from "./form/AddCategoryForm";
import List from "./list";

function Index() {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  return (
    <>
      <List handleShowForm={handleToggleForm} />
      <Sheet open={showForm} onOpenChange={handleToggleForm}>
        <SheetContent>
          <AddCategoryForm />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Index;
