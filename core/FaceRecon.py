import threading
import time
import cv2
from deepface import DeepFace

class FaceRecon:

    def __init__(self, source:int):
        self.cap = cv2.VideoCapture(source, cv2.CAP_DSHOW)

        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        self.counter = 0

        self.reference_img = cv2.imread(r"D:\Project\Final Year Project\defense sphere\core\data\reference.jpg")  # use your own image here

        self.face_match = False


    def check_face(self, frame):
        try:
            if DeepFace.verify(frame, self.reference_img.copy())['verified']:
                self.face_match = True
            else:
                self.face_match = False
        except ValueError:
            self.face_match = False

    def run(self):

        while True:
            ret, frame = self.cap.read()

            if ret:
                if self.counter % 30 == 0:
                    try:
                        threading.Thread(target=self.check_face, args=(frame.copy(),)).start()
                    except ValueError:
                        pass
                self.counter += 1
                if self.face_match:
                    print('Done')
                    return 1
                else:
                    time.sleep(0.5)


# if name == main
if __name__ == "__main__":
    f = FaceRecon.FaceRecon(1)
    r = 1 if f.run() else 0
    print(r)