import { Button } from "@/components/ui/button";

const NotFoundMessage = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className=" flex flex-col items-center justify-center h-full gap-4 max-w-2xl text-center">
        <h3 className="text-primary text-xl lg:text-2xl font-semibold">
          You haven’t Created any messages
        </h3>
        <p className="text-slate-700 text-sm lg:text-base">
          Once a trainee or organization starts a conversation, it will appear
          here. You can manage private and public threads, respond, and moderate
          messages all in one place.
        </p>
        <Button variant="secondary" className="mt-4">
          Start a Conversation
        </Button>
      </div>
    </div>
  );
};

export default NotFoundMessage;
