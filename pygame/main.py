import pygame
from pygame.locals import *
import sys
import time

pygame.init()

screen = pygame.display.set_mode((640, 480))
pygame.display.set_caption("not a clicker")
font = pygame.font.Font(None, 36)
clock = pygame.time.Clock()


def main():
    clicks = 0
    start_time = time.time()
    while True:
        clock.tick(60)
        screen.fill((0, 0, 0))

        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == MOUSEBUTTONDOWN:
                clicks += 1

        elapsed_time = int(time.time() - start_time)

        clicks_text = font.render(
            "Clicks: " + str(clicks), True, (255, 255, 255))
        time_text = font.render(
            "Time: " + str(elapsed_time), True, (255, 255, 255))

        screen.blit(clicks_text, (10, 10))
        screen.blit(time_text, (10, 50))

        pygame.display.update()


if __name__ == "__main__":
    main()
