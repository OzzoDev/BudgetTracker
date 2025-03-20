import GoalsForm from "@/components/goal/GoalsForm";
import GoalsRecord from "@/components/goal/GoalsRecord";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-y-12 p-8">
      <GoalsForm />
      <GoalsRecord />
    </div>
  );
}
