// src/lib/utils/analytics-queue.util.ts

type QueueItem = {
    id: string;
    fn: () => Promise<any>;
    retries: number;
    maxRetries: number;
};

class AnalyticsQueue {
    private queue: QueueItem[] = [];
    private isProcessing = false;
    private readonly BATCH_SIZE = 5;
    private readonly DELAY_MS = 200; // 200ms between batches
    private readonly MAX_RETRIES = 3;

    /**
     * Add tracking request to queue
     */
    async add(fn: () => Promise<any>, id?: string): Promise<void> {
        const queueItem: QueueItem = {
            id: id || `track-${Date.now()}-${Math.random()}`,
            fn,
            retries: 0,
            maxRetries: this.MAX_RETRIES
        };

        this.queue.push(queueItem);

        if (!this.isProcessing) {
            this.process();
        }
    }

    /**
     * Process queue in batches
     */
    private async process(): Promise<void> {
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const batch = this.queue.splice(0, this.BATCH_SIZE);

            // Execute batch in parallel
            const results = await Promise.allSettled(
                batch.map(item => item.fn())
            );

            // Handle failures - retry if needed
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    const failedItem = batch[index];

                    if (failedItem.retries < failedItem.maxRetries) {
                        console.warn(`⚠️ [QUEUE] Retrying ${failedItem.id}...`);
                        failedItem.retries++;
                        this.queue.push(failedItem); // Re-add to queue
                    } else {
                        console.error(`❌ [QUEUE] Max retries reached for ${failedItem.id}`);
                    }
                }
            });

            // Wait before next batch (respects rate limits)
            if (this.queue.length > 0) {
                await new Promise(resolve => setTimeout(resolve, this.DELAY_MS));
            }
        }

        this.isProcessing = false;
    }

    /**
     * Get queue status
     */
    getStatus() {
        return {
            queueLength: this.queue.length,
            isProcessing: this.isProcessing
        };
    }
}

export const analyticsQueue = new AnalyticsQueue();