export default class EventExecution{
    private on_event: any;
    private on_error: any;

    onSuccess(f: any): EventExecution{
        this.on_event = f;
        return this;
    }
    onError(f: any): EventExecution{
        this.on_error = f;
        return this;
    }

    execute(event: boolean): any{
        return event ? this.on_event : this.on_error;
    }
}
