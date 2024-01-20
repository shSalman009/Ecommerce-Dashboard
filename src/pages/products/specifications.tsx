import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

interface SpecificationsProps {
  MIN_SPECIFICATION_LENGTH: number;
  MAX_SPECIFICATION_LENGTH: number;
}

const Specifications = ({
  MIN_SPECIFICATION_LENGTH,
  MAX_SPECIFICATION_LENGTH,
}: SpecificationsProps) => {
  const [nameOfEditSpecification, setNameOfEditSpecification] =
    useState<string>("");
  const [value, setValue] = useState({ name: "", value: "" });
  const [specificationModel, setSpecificationModel] = useState<
    "add" | "edit" | "default"
  >("default");

  const form = useFormContext();

  const specifications = form.getValues("specifications");

  const handleAddSpecifications = () => {
    setSpecificationModel("add");
  };

  const handleEditSpecifications = (name: string) => {
    setNameOfEditSpecification(name);
    setSpecificationModel("edit");
    setValue({ name, value: specifications[name] });
  };

  const handleDeleteSpecifications = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [name]: _, ...rest } = specifications;
    form.setValue("specifications", rest);
  };

  const handleSaveSpecifications = () => {
    setSpecificationModel("default");

    if (specificationModel === "edit") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [nameOfEditSpecification]: _, ...rest } = specifications;
      form.setValue("specifications", { ...rest, [value.name]: value.value });
    } else {
      form.setValue("specifications", {
        ...specifications,
        [value.name]: value.value,
      });
    }

    setValue({ name: "", value: "" });
  };

  const handleCancelSpecifications = () => {
    setSpecificationModel("default");
    setValue({ name: "", value: "" });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h5>
          Specifications
          <span className="text-gray-600 text-sm">(Optional)</span>
        </h5>
        <p className="text-gray-600 text-sm">
          Add your product specifications.
        </p>
      </div>

      {specifications && Object.keys(specifications).length > 0 && (
        <div className="space-y-2">
          <h5>Specifications</h5>
          <ul className="list-inside space-y-2">
            {Object.entries(specifications).map(([specification, value], i) => (
              <li
                className="flex justify-between items-center border rounded p-2"
                key={i}
              >
                <div className="w-full flex gap-2">
                  <p className="font-semibold">{specification} :</p>
                  <p>{value as ReactNode}</p>
                </div>
                {/* Edit and Delete Icon */}
                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() => handleEditSpecifications(specification)}
                    variant="outline"
                    size="icon"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>{" "}
                  <Button
                    onClick={() => handleDeleteSpecifications(specification)}
                    variant="outline"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {specificationModel !== "default" && (
        <div className="flex gap-2">
          <FormItem className="w-1/4">
            <FormLabel>Specification Name</FormLabel>
            <FormControl>
              <Input
                value={value.name}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Specification name..."
                className="resize-none"
              />
            </FormControl>
          </FormItem>
          <FormItem className="w-3/4">
            <FormLabel>Specification Value</FormLabel>
            <FormControl>
              <Input
                value={value.value}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev, value: e.target.value }))
                }
                placeholder="Specification value..."
                className="resize-none"
              />
            </FormControl>
          </FormItem>
        </div>
      )}

      {specificationModel === "default" && (
        <Button
          onClick={handleAddSpecifications}
          className="w-full"
          type="button"
        >
          Add Specification
        </Button>
      )}
      {specificationModel !== "default" && (
        <div className="flex justify-end items-center gap-3">
          <Button
            onClick={handleCancelSpecifications}
            type="button"
            variant="destructive"
          >
            Cancel
          </Button>
          <Button
            disabled={
              value.name === "" ||
              value.value === "" ||
              value.name.length < MIN_SPECIFICATION_LENGTH ||
              value.name.length > MAX_SPECIFICATION_LENGTH ||
              value.value.length < MIN_SPECIFICATION_LENGTH ||
              value.value.length > MAX_SPECIFICATION_LENGTH
            }
            onClick={handleSaveSpecifications}
            type="button"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default Specifications;
