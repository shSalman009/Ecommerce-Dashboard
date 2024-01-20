import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

import CreateBrandForm from "./form/createBrandForm";
import BrandList from "./list/brandList";

function Index() {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  return (
    <>
      <BrandList handleShowForm={handleToggleForm} />
      <Sheet open={showForm} onOpenChange={handleToggleForm}>
        <SheetContent>
          <CreateBrandForm />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Index;
