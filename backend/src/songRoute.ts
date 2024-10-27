import { Router } from "express";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs"
const execAsync = promisify(exec);
const router = Router();

const generateUniqueFilename = async (VideoId: string): Promise<string> => {
    const { stdout: metadataStdout } = await execAsync(
      `yt-dlp --skip-download --get-title https://www.youtube.com/watch?v=${VideoId}`
    );
    
    let metadataLines = metadataStdout.trim();
    
    // Extract only the first 4 words and sanitize special characters
    let Title = metadataLines.split(" ").slice(0, 4).join(" ");
    Title = Title.replace(/[\/:*?"<>|#]/g, ""); // Remove invalid characters
  
    console.log(Title);
    return Title;
  };

  async function downloadSong(VideoId:string , output:string){
try {
    const command = `yt-dlp -f 140 -o "${output}.m4a" https://www.youtube.com/watch?v=${VideoId}`;
    const { stdout, stderr } = await execAsync(command);
    console.log("Output:", stdout);
} catch (error) {
    console.error("Error downloading song:", error);
}
}

router.get("/song/:id", async(req,res)=>{
const videoId = req.params.id;
if (!videoId) {
    return res.status(400).json({ error: "Invalid ID." });
}
const Title = await generateUniqueFilename(videoId);
const outputFile = await downloadSong(videoId , Title);

 //@ts-ignore
 const currentDirectory = __dirname;
 console.log(currentDirectory);

 const parentDirectory = path.join(currentDirectory, "..");

 const filepath = path.join(parentDirectory, `${Title}.m4a`);
 console.log(filepath);

 res.download(filepath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).json({ error: "Could not download the file." });
    }
    setTimeout(() => {
        fs.unlink(filepath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
          } else {
            console.log(`File ${filepath} deleted successfully.`);
          }
        });
      }, 5000);

  });

  
})




export default router
