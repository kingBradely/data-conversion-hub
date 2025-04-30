import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-timer',
    standalone: true,
    templateUrl: './timer.component.html',
    imports: [CommonModule],
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
    private subscription: Subscription | undefined;
    private readonly FIFTEEN_MINUTES = 15 * 60; // 15 minutes in seconds
    @Input() startCountdown: boolean = false;

    timeLeft: number = this.FIFTEEN_MINUTES;
    isRunning: boolean = false;

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['startCountdown'] && this.startCountdown) {
            this.resetTimer();
            this.startTimer();
        }else{
            this.resetTimer();
        }
    }

    startTimer(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.subscription = interval(1000).subscribe(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                } else {
                    this.stopTimer();
                }
            });
        }
    }

    stopTimer(): void {
        this.isRunning = false;
        this.subscription?.unsubscribe();
    }

    resetTimer(): void {
        this.stopTimer();
        this.timeLeft = this.FIFTEEN_MINUTES;
    }

    formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}