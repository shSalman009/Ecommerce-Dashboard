import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface FeaturesProps {
  MIN_FEATURE_LENGTH: number;
  MAX_FEATURE_LENGTH: number;
}

const Features = ({
  MIN_FEATURE_LENGTH,
  MAX_FEATURE_LENGTH,
}: FeaturesProps) => {
  const [indexOfEditItem, setIndexOfEditItem] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const [featuresModel, setFeaturesModel] = useState<
    "add" | "edit" | "default"
  >("default");

  const form = useFormContext();

  const features = form.getValues("features");

  // console.log("form.formState.errors", form.formState.errors);

  const handleAddFeatures = () => {
    setFeaturesModel("add");
  };

  const handleEditFeatures = (index: number) => {
    setFeaturesModel("edit");
    setIndexOfEditItem(index);
    setValue(features[index]);
  };

  const handleDeleteFeatures = (index: number) => {
    form.setValue(
      "features",
      features.filter((_: string, i: number) => i !== index)
    );
  };

  const handleSaveFeatures = () => {
    setFeaturesModel("default");

    if (featuresModel === "edit") {
      form.setValue(
        "features",
        features.map((item: string, index: number) =>
          index === indexOfEditItem ? value : item
        )
      );
    } else {
      form.setValue("features", [...features, value]);
    }

    setValue("");
  };

  const handleCancelFeatures = () => {
    setFeaturesModel("default");
    setValue("");
  };

  return (
    <div className=" space-y-6">
      <div className="space-y-2">
        <h5>
          Features <span className="text-gray-600 text-sm">(Optional)</span>
        </h5>
        <p className="text-gray-600 text-sm">Add your product features.</p>
      </div>

      {features?.length > 0 && (
        <div className="space-y-2">
          <h5>Features</h5>
          <ul className="list-inside space-y-2">
            {features.map((feature: string, i: number) => (
              <li
                className="flex justify-between items-center border rounded p-2"
                key={i}
              >
                <span className="inline-block">{feature}</span>
                {/* Edit and Delete Icon */}
                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() => handleEditFeatures(i)}
                    variant="outline"
                    size="icon"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>{" "}
                  <Button
                    onClick={() => handleDeleteFeatures(i)}
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

      {featuresModel !== "default" && (
        <>
          <FormItem>
            <FormLabel>Product Features</FormLabel>
            <FormControl>
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write features of your product..."
                className="resize-none"
              />
            </FormControl>
          </FormItem>
        </>
      )}
      {featuresModel === "default" && (
        <Button onClick={handleAddFeatures} className="w-full" type="button">
          Add Features
        </Button>
      )}
      {featuresModel !== "default" && (
        <div className="flex justify-end items-center gap-3">
          <Button
            onClick={handleCancelFeatures}
            type="button"
            variant="destructive"
          >
            Cancel
          </Button>
          <Button
            disabled={
              value === "" ||
              value.length < MIN_FEATURE_LENGTH ||
              value.length > MAX_FEATURE_LENGTH
            }
            onClick={handleSaveFeatures}
            type="button"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default Features;
