package com.project.controller;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.utils.StorageService;

@CrossOrigin
@Controller
public class FileControllerImpl {

	@Autowired
	private StorageService storageService;

	@RequestMapping(value = "/{fileName}", produces = "image/*")
	public void download(@PathVariable("fileName") String fileName, HttpServletResponse response) {

		System.out.println("Loading file: " + fileName);

		Resource resource = storageService.load(fileName);

		if (resource != null) {

			try (InputStream input = resource.getInputStream()) {

				ServletOutputStream output = response.getOutputStream();

				FileCopyUtils.copy(input, output);

			} catch (IOException e) {

				e.printStackTrace();
			}
		}
	}
}
