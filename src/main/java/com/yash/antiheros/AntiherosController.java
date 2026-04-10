package com.yash.antiheros;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/antiheroes")
public class AntiherosController {

    @Autowired
    private AntiherosService antiherosService;

    @GetMapping
    public List<Antihero> getAllAntiheroes() {
        return antiherosService.getAllAntiheroes();
    }

    @GetMapping("/search")
    public List<Antihero> searchByName(@RequestParam String name) {
        return antiherosService.searchByName(name);
    }

    @GetMapping("/universe/{universe}")
    public List<Antihero> getByUniverse(@PathVariable String universe) {
        return antiherosService.getByUniverse(universe);
    }

    @GetMapping("/{id}")
    public Antihero getAntiheroById(@PathVariable long id) {
        return antiherosService.getAntiheroById(id);
    }

    @PostMapping
    public Antihero addAntihero(@RequestBody Antihero antihero) {
        return antiherosService.addAntihero(antihero);
    }

    @PostMapping("/{id}/image")
    public Antihero uploadImage(@PathVariable long id,
                                @RequestParam("file") MultipartFile file) throws IOException {
        String filename = id + "_" + Paths.get(file.getOriginalFilename()).getFileName().toString();
        Path uploadDir = Paths.get("src/main/resources/static/images/uploads");
        Files.createDirectories(uploadDir);
        Files.copy(file.getInputStream(), uploadDir.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        return antiherosService.updateImageUrl(id, "/images/uploads/" + filename);
    }

    @PutMapping("/{id}")
    public Antihero updateAntihero(@PathVariable long id, @RequestBody Antihero antihero) {
        antihero.setCharacterId(id);
        antiherosService.updateAntihero(antihero);
        return antiherosService.getAntiheroById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteAntihero(@PathVariable long id) {
        antiherosService.deleteAntihero(id);
        return "Antihero with ID " + id + " deleted.";
    }
}
