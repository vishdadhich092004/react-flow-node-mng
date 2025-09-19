import { Button } from "@/components/ui/button"

export const SubmitButton = () => {

    return (
        <div className="flex items-center justify-center">
            <Button type="submit" variant="default" className="bg-blue-500 text-white">Submit</Button>
        </div>
    );
}
